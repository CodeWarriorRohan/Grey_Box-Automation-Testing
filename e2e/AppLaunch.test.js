describe('App Launch', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  afterEach(async () => {
    console.log('🔄 Resetting input fields after test');
    await element(by.id('emailInput')).clearText();
    await element(by.id('passwordInput')).clearText();
  });

  /*** UI Rendering Tests Cases Login ***/

  it('should have background image', async () => {
    console.log('✅ Test background image render correctly');
    await expect(element(by.id('topVector'))).toBeVisible();
  });

  it('should have hello text', async () => {
    console.log('✅ Test hello text render correctly');
    await expect(element(by.id('helloText'))).toBeVisible();
  });

  it('should display "Login Now" text', async () => {
    console.log('✅ Test login text render correctly');
    await expect(element(by.id('loginNowText'))).toBeVisible();
  });

  it('should render email input field', async () => {
    console.log('✅ Test email input render correctly');
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('should render password input field', async () => {
    console.log('✅ Test password input render correctly');
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('should render login button', async () => {
    console.log('✅ Test login button render correctly');
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  /*** Functionality Tests Cases Login ***/

  it('should show an error alert if login is attempted with empty fields', async () => {
    console.log('✅ Testing attempted login with empty fields');
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Please enter both email and password.')),
    ).toBeVisible();
  });

  it('should show an error if email format is incorrect', async () => {
    console.log('✅ Testing invalid email format');
    await element(by.id('emailInput')).typeText('test123');
    await element(by.id('passwordInput')).typeText('Password@123');
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Please enter a valid email address.')),
    ).toBeVisible();
  });

  it('should show an error if password format is incorrect', async () => {
    console.log('✅ Testing weak password error');
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('weakpassword');
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(
        by.text(
          'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
        ),
      ),
    ).toBeVisible();
  });

  it('should navigate to the Dashboard screen after successful login', async () => {
    console.log('✅ Testing successful login navigation');
    await element(by.id('emailInput')).typeText('test@example.com');
    await element(by.id('passwordInput')).typeText('Password@123');
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.id('dashboardScreen'))).toBeVisible();
    await element(by.id('logoutButton')).tap();
  });

  it('should allow guest access by navigating to Dashboard', async () => {
    console.log('✅ Testing navigation to Dashboard screen');
    await element(by.id('guestButton')).tap();
    await waitFor(element(by.id('dashboardScreen'))).toBeVisible();
    await element(by.id('logoutButton')).tap();
  });

  it('should navigate to the Signup screen when clicking Sign Up TextButton', async () => {
    console.log('✅ Testing navigation to Signup screen');
    await element(by.id('signupButton')).tap();
    await waitFor(element(by.id('signupScreen'))).toBeVisible();
  });

  /* UI Rendering Tests Signup */

  it('should have background image', async () => {
    console.log('✅ Test background image render correctly.');
    await expect(element(by.id('topVector'))).toBeVisible();
  });

  it('should have "Welcome" text', async () => {
    console.log('✅ Test welcome text render correctly');
    await expect(element(by.id('welcomeText'))).toBeVisible();
  });

  it('should have "Create a new account" text', async () => {
    console.log('✅ Test new account text render correctly');
    await expect(element(by.id('createNewAccountText'))).toBeVisible();
  });

  it('should render fullName input field', async () => {
    console.log('✅ Test fullName input field render correctly');
    await expect(element(by.id('nameInput'))).toBeVisible();
  });

  it('should have email input field', async () => {
    console.log('✅ Test email input render correctly');
    await expect(element(by.id('emailInput'))).toBeVisible();
  });

  it('should render password input field', async () => {
    console.log('✅ Test password input render correctly');
    await expect(element(by.id('passwordInput'))).toBeVisible();
  });

  it('should have confirm password input field', async () => {
    console.log('✅ Test confirm password input render correctly');
    await expect(element(by.id('confirmPasswordInput'))).toBeVisible();
  });

  it('should render mobile number input field', async () => {
    console.log('✅ Test mobile number input render correctly');
    await expect(element(by.id('mobileInput'))).toBeVisible();
  });

  it('should render signup button', async () => {
    console.log('✅ Test signup button render correctly');
    await expect(element(by.id('signupButton'))).toBeVisible();
  });

  it('should render login button', async () => {
    console.log('✅ Test login button render correctly');
    await expect(element(by.id('loginButton'))).toBeVisible();
  });

  /* Functionality Tests Cases Signup */

  it('should show an error when trying to signup with empty fields', async () => {
    console.log('✅ Testing attempted signup with empty fields');

    // Ensure we are on the signup screen before starting the test
    await waitFor(element(by.id('signupScreen')))
      .toBeVisible()
      .withTimeout(5000);

    // Ensure signup button is visible
    await waitFor(element(by.id('signupButton')))
      .toBeVisible()
      .withTimeout(5000);
    await element(by.id('signupButton')).tap();

    // Check for error message
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(element(by.text('Please fill in all fields.'))).toBeVisible();
  });

  it('shows an error when full name is less than 2 letters', async () => {
    console.log('✅ Testing full name validation');
    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('A');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('test@gmail.com');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('Password@123');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('Password@123');

    // Ensure mobileInput is visible
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Delay before interaction

    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('1234567890');

    // Tap outside to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('signupButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Full Name must be at least 2 letters.')),
    ).toBeVisible();
  });

  it('shows an error if email format is incorrect', async () => {
    console.log('✅ Testing invalid email format');

    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('Ankush Singh');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('testgmail');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('Password@123');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('Password@123');

    // Ensure mobileInput is visible and interactable
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Small delay
    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('1234567890');

    // Tap elsewhere to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('signupScreen')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Please enter a valid email address.')),
    ).toBeVisible();
  });

  it('shows an error if password format is incorrect', async () => {
    console.log('✅ Testing invalid password format');

    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('Ankush Singh');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('test@gmail.com');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('weakPassword');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('weakPassword');

    // Ensure mobileInput is visible and interactable
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Small delay
    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('1234567890');

    // Tap elsewhere to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('signupButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(
        by.text(
          'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
        ),
      ),
    ).toBeVisible();
  });

  it("shows an error if password and confirm passwords doesn't match", async () => {
    console.log('✅ Testing passwords are match or not');

    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('Ankush Singh');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('test@gmail.com');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('Password@123');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('Password@321');

    // Ensure mobileInput is visible and interactable
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Small delay
    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('1234567890');

    // Tap elsewhere to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('signupButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Password and Confirm Password do not match.')),
    ).toBeVisible();
  });

  it('shows an error if mobile number is less than 10 digits', async () => {
    console.log('✅ Testing mobile number');

    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('Ankush Singh');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('test@gmail.com');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('Password@123!');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('Password@123!');

    // Ensure mobileInput is visible and interactable
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Small delay
    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('123456789');

    // Tap elsewhere to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('signupButton')).tap();
    await waitFor(element(by.text('Error'))).toBeVisible();
    await expect(
      element(by.text('Mobile number must be of 10 digits.')),
    ).toBeVisible();
  });

  it('should render login page after signup completion', async () => {
    console.log('✅ Test login button render correctly after signup completion');

    await element(by.id('nameInput')).tap();
    await element(by.id('nameInput')).clearText();
    await element(by.id('nameInput')).replaceText('Ankush Singh');

    await element(by.id('emailInput')).tap();
    await element(by.id('emailInput')).clearText();
    await element(by.id('emailInput')).replaceText('test@gmail.com');

    await element(by.id('passwordInput')).tap();
    await element(by.id('passwordInput')).clearText();
    await element(by.id('passwordInput')).replaceText('Password@123!');

    await element(by.id('confirmPasswordInput')).tap();
    await element(by.id('confirmPasswordInput')).clearText();
    await element(by.id('confirmPasswordInput')).replaceText('Password@123!');

    // Ensure mobileInput is visible and interactable
    await element(by.id('mobileInput')).scroll(200, 'down');
    await new Promise(res => setTimeout(res, 500)); // Small delay
    await element(by.id('mobileInput')).tap();
    await element(by.id('mobileInput')).clearText();
    await element(by.id('mobileInput')).replaceText('1234567890');

    // Tap elsewhere to remove keyboard focus
    await element(by.id('signupScreen')).tap();
    await element(by.id('loginButton')).tap();
    await waitFor(element(by.text('Success'))).toBeVisible();
    await expect(
      element(by.text('Login Now')),
    ).toBeVisible();
  });
});
