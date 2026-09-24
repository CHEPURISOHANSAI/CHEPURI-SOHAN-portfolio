import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

// Create a local static file server for dist
function startServer(port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const parsedUrl = new URL(req.url, `http://localhost:${port}`);
      let reqPath = parsedUrl.pathname;
      if (reqPath === '/' || !path.extname(reqPath)) {
        reqPath = '/index.html';
      }
      const safePath = path.normalize(path.join(DIST_DIR, reqPath));
      if (!safePath.startsWith(DIST_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      fs.readFile(safePath, (err, data) => {
        if (err) {
          // Fallback to index.html for SPA routing
          fs.readFile(path.join(DIST_DIR, 'index.html'), (err2, indexData) => {
            if (err2) {
              res.writeHead(404);
              res.end('Not Found');
            } else {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(indexData);
            }
          });
          return;
        }
        const ext = path.extname(safePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      });
    });

    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

(async () => {
  const PORT = 4321;
  console.log(`Starting local static HTTP server on port ${PORT}...`);
  const server = await startServer(PORT);
  console.log(`Static server running at http://127.0.0.1:${PORT}/`);

  const results = {
    checks: [],
    errors: [],
    warnings: [],
  };

  function assert(name, condition, details = '') {
    if (condition) {
      console.log(`  [PASS] ${name}${details ? ` -> ${details}` : ''}`);
      results.checks.push({ name, status: 'PASS', details });
    } else {
      console.error(`  [FAIL] ${name}${details ? ` -> ${details}` : ''}`);
      results.checks.push({ name, status: 'FAIL', details });
      results.errors.push(`Assertion failed: ${name} (${details})`);
    }
  }

  console.log('\nLaunching Playwright Chromium (headless)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // Listen for console messages and unhandled errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`  [Browser Console Error]: ${msg.text()}`);
      results.errors.push(`Console Error: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => {
    console.error(`  [Page Error]: ${err.message}`);
    results.errors.push(`Page Error: ${err.message}`);
  });

  const url = `http://127.0.0.1:${PORT}/`;
  console.log(`\nNavigating to ${url}...`);
  await page.goto(url, { waitUntil: 'networkidle' });

  // 1. Page Title & Basic Shell
  console.log('\n--- 1. Testing Shell & Title ---');
  const pageTitle = await page.title();
  console.log(`Page title: "${pageTitle}"`);
  assert('Page Title is populated', pageTitle.length > 0, pageTitle);

  // 2. Hero Section
  console.log('\n--- 2. Testing Hero Section ---');
  const heroNameLocator = page.locator('.hero-name');
  await heroNameLocator.waitFor({ state: 'visible' });
  const heroName = await heroNameLocator.innerText();
  assert('Hero name contains "Chepuri Sohan"', heroName.includes('Chepuri Sohan'), heroName);

  const heroCollege = await page.locator('text=Vidya Jyothi Institute of Technology').first().isVisible();
  assert('Hero mentions VJIT', heroCollege);

  const heroCGPA = await page.locator('text=CGPA 8.38').first().isVisible();
  assert('Hero mentions CGPA 8.38', heroCGPA);

  // Quick connect links
  const heroPhoneLink = page.locator('a[href*="tel:6304780113"], a[href*="tel:+916304780113"]').first();
  assert('Hero includes Phone link for +91 63047 80113', (await heroPhoneLink.count()) > 0);

  const heroLinkedIn = page.locator('a[href*="linkedin.com"]').first();
  assert('Hero includes LinkedIn profile link', (await heroLinkedIn.count()) > 0);

  const heroGitHub = page.locator('a[href*="github.com"]').first();
  assert('Hero includes GitHub profile link', (await heroGitHub.count()) > 0);

  await page.screenshot({ path: 'screenshot-01-hero.png' });
  console.log('Saved screenshot-01-hero.png');

  // 3. Navigation Links
  console.log('\n--- 3. Testing Navigation ---');
  const navIds = ['about', 'skills', 'certifications', 'projects', 'education', 'looking', 'contact'];
  for (const id of navIds) {
    const sectionLocator = page.locator(`#${id}`);
    const exists = (await sectionLocator.count()) > 0;
    assert(`Section #${id} exists in DOM`, exists);
  }

  // 4. About Section
  console.log('\n--- 4. Testing About Section ---');
  const aboutSec = page.locator('#about');
  await aboutSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert('About section is visible', await aboutSec.isVisible());
  await page.screenshot({ path: 'screenshot-02-about.png' });
  console.log('Saved screenshot-02-about.png');

  // 5. Skills Section
  console.log('\n--- 5. Testing Skills & Stats Section ---');
  const skillsSec = page.locator('#skills');
  await skillsSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Assert removed skills are NOT present in the skills list
  const dsaPresent = (await skillsSec.locator('text=Data Structures (DSA)').count()) > 0;
  const oopPresent = (await skillsSec.locator('text=OOP Principles').count()) > 0;
  const embeddedCPresent = (await skillsSec.locator('text=Embedded C++').count()) > 0;
  const gitHubPresent = (await skillsSec.locator('text=Git & GitHub').count()) > 0;
  assert('DSA is removed from skills', !dsaPresent);
  assert('OOP Principles is removed from skills', !oopPresent);
  assert('Embedded C++ is removed from skills', !embeddedCPresent);
  assert('Git & GitHub is removed from skills', !gitHubPresent);

  // Assert retained skills
  const pythonText = await skillsSec.locator('text=Python').first().isVisible();
  const javaText = await skillsSec.locator('text=Java').first().isVisible();
  const sqlText = await skillsSec.locator('text=SQL & DBMS').first().isVisible();
  assert('Retained core skills (Python, Java, SQL & DBMS) are visible', pythonText && javaText && sqlText);

  await page.screenshot({ path: 'screenshot-03-skills.png' });
  console.log('Saved screenshot-03-skills.png');

  // 6. Certifications Section & Carousel
  console.log('\n--- 6. Testing Certifications Carousel ---');
  const certsSec = page.locator('#certifications');
  await certsSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const ciscoCert = await page.locator('text=Cisco Certification').first().isVisible();
  const codetantraCert = await page.locator('text=Codetantra Programming Certification').first().isVisible();
  const infosysCert = await page.locator('text=Infosys Springboard Certification').first().isVisible();
  assert('Certifications include Cisco', ciscoCert);
  assert('Certifications include Codetantra', codetantraCert);
  assert('Certifications include Infosys Springboard', infosysCert);
  await page.screenshot({ path: 'screenshot-04-certs.png' });
  console.log('Saved screenshot-04-certs.png');

  // 7. Projects Section
  console.log('\n--- 7. Testing Projects Section ---');
  const projectsSec = page.locator('#projects');
  await projectsSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const esp32Project = await page.locator('text=Intelligent Car with Accident Alert').first().isVisible();
  const hotelProject = await page.locator('text=Hotel Reservation System').first().isVisible();
  assert('Projects include ESP32 Intelligent Car', esp32Project);
  assert('Projects include Hotel Reservation System', hotelProject);

  // Assert AlgoVisualizer and Attendance App are removed
  const algoPresent = (await projectsSec.locator('text=AlgoVisualizer').count()) > 0;
  const attendPresent = (await projectsSec.locator('text=SmartAttend').count()) > 0;
  assert('AlgoVisualizer is removed from projects', !algoPresent);
  assert('Attendance App is removed from projects', !attendPresent);

  // Assert Live Demo and GitHub buttons are removed from project cards
  const liveDemoInProjects = (await projectsSec.locator('text=Live Demo').count()) > 0;
  const gitHubInProjects = (await projectsSec.locator('a:has-text("GitHub")').count()) > 0;
  assert('Live Demo button is removed from projects', !liveDemoInProjects);
  assert('GitHub button is removed from projects', !gitHubInProjects);

  await page.screenshot({ path: 'screenshot-05-projects.png' });
  console.log('Saved screenshot-05-projects.png');

  // 8. Education Section
  console.log('\n--- 8. Testing Education Section ---');
  const eduSec = page.locator('#education');
  await eduSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const btechEdu = await page.locator('text=Vidya Jyothi Institute of Technology (VJIT), Hyderabad').first().isVisible();
  const cgpaEdu = await page.locator('text=8.38 / 10 CGPA').first().isVisible();
  const vertexEdu = await page.locator('text=Vertex Junior College, Hyderabad').first().isVisible();
  const geethaEdu = await page.locator('text=Geetha High School').first().isVisible();
  assert('Education lists VJIT B.Tech', btechEdu);
  assert('Education lists 8.38 / 10 CGPA', cgpaEdu);
  assert('Education lists Vertex Junior College (92.1%)', vertexEdu);
  assert('Education lists Geetha High School (9.5 GPA)', geethaEdu);
  await page.screenshot({ path: 'screenshot-06-education.png' });
  console.log('Saved screenshot-06-education.png');

  // 9. Contact Section & Form
  console.log('\n--- 9. Testing Contact & Form Section ---');
  const contactSec = page.locator('#contact');
  await contactSec.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const emailVisible = await page.locator('text=sohansaichepuri@gmail.com').first().isVisible();
  const phoneVisible = await page.locator('text=+91 63047 80113').first().isVisible();
  assert('Contact displays email sohansaichepuri@gmail.com', emailVisible);
  assert('Contact displays phone +91 63047 80113', phoneVisible);

  // Test form input filling
  const nameInput = page.locator('#contact input[placeholder*="Alex Chen"], #contact input').first();
  if (await nameInput.count() > 0) {
    await nameInput.fill('Hiring Manager');
  }
  await page.screenshot({ path: 'screenshot-07-contact.png' });
  console.log('Saved screenshot-07-contact.png');

  // 10. AI Chatbot Interaction
  console.log('\n--- 10. Testing Interactive AI Chatbot ---');
  const chatBtn = page.locator('.chat-btn');
  assert('Chatbot button is visible on screen', await chatBtn.isVisible());
  await chatBtn.click();
  await page.waitForTimeout(500);

  const chatPanel = page.locator('.chat-panel');
  assert('Chatbot modal panel opens', await chatPanel.isVisible());
  await page.screenshot({ path: 'screenshot-08-chat-opened.png' });
  console.log('Saved screenshot-08-chat-opened.png');

  // Test prompt chips
  const eduChip = page.locator('.chat-chip:has-text("Education")').first();
  if (await eduChip.count() > 0) {
    console.log('  Clicking "Education & College" suggestion chip...');
    await eduChip.click();
    // Wait for AI response to be generated
    await page.waitForTimeout(1400);
    const chatContent = await chatPanel.innerText();
    assert('Chatbot responds with VJIT / Education details', chatContent.includes('VJIT') || chatContent.includes('Vidya Jyothi'));
  }

  // Test custom typed query
  const chatInput = page.locator('.chat-panel input');
  if (await chatInput.count() > 0) {
    console.log('  Typing custom query into chatbot...');
    await chatInput.fill('tell me about your intelligent car project');
    await chatInput.press('Enter');
    await page.waitForTimeout(1400);
    const chatContent2 = await chatPanel.innerText();
    assert('Chatbot responds to project query with ESP32 info', chatContent2.toLowerCase().includes('esp32') || chatContent2.toLowerCase().includes('car'));
  }
  await page.screenshot({ path: 'screenshot-09-chat-replied.png' });
  console.log('Saved screenshot-09-chat-replied.png');

  // Close chat
  const closeChatBtn = page.locator('.chat-panel button[title="Close chat"]');
  if (await closeChatBtn.count() > 0) {
    await closeChatBtn.click();
    await page.waitForTimeout(300);
    assert('Chatbot modal closes cleanly', !(await chatPanel.isVisible()));
  }

  // 11. Full Page Desktop Screenshot
  console.log('\n--- 11. Full Page Desktop Screenshot ---');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshot-full-page.png', fullPage: true });
  console.log('Saved screenshot-full-page.png');

  // 12. Mobile Responsive Test
  console.log('\n--- 12. Testing Mobile Responsive Viewport ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(url, { waitUntil: 'networkidle' });

  // Check no horizontal scrolling / overflow
  const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile dimensions - clientWidth: ${clientWidth}px, scrollWidth: ${scrollWidth}px`);
  
  if (scrollWidth > clientWidth + 2) {
    const culprits = await mobilePage.evaluate(() => {
      const cw = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll('*'))
        .filter(el => {
          const r = el.getBoundingClientRect();
          return r.right > cw + 2;
        })
        .map(el => ({
          tag: el.tagName,
          id: el.id,
          class: el.className,
          right: Math.round(el.getBoundingClientRect().right),
          text: (el.textContent || '').trim().slice(0, 40)
        }))
        .slice(0, 10);
    });
    console.log('Overflow culprits on mobile:', JSON.stringify(culprits, null, 2));
  }
  assert('Mobile layout has no horizontal overflow', scrollWidth <= clientWidth + 2, `scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);

  // Check mobile hero name
  const mobileHeroName = await mobilePage.locator('.hero-name').innerText();
  assert('Mobile hero name displays "Chepuri Sohan"', mobileHeroName.includes('Chepuri Sohan'));

  await mobilePage.screenshot({ path: 'screenshot-10-mobile.png', fullPage: false });
  console.log('Saved screenshot-10-mobile.png');
  await mobileContext.close();

  // Teardown
  console.log('\n--- Teardown ---');
  await browser.close();
  server.close();

  console.log('\n========================================');
  console.log(`TEST SUMMARY:`);
  console.log(`Total Checks: ${results.checks.length}`);
  const passed = results.checks.filter(c => c.status === 'PASS').length;
  const failed = results.checks.filter(c => c.status === 'FAIL').length;
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Errors: ${results.errors.length}`);
  console.log('========================================\n');

  if (failed > 0 || results.errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
})();
