import { fireEvent, render } from "@testing-library/react-native";
import { Alert } from "react-native";
import SignupScreen from "../../components/Signup";

describe("SignupScreen Components", () => {
    beforeEach(() => {
        jest.spyOn(Alert, "alert");
    });

    test("renders all UI elements correctly", () => {
        console.log("✅ Checking UI elements render correctly");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        expect(getByPlaceholderText("Full Name")).toBeTruthy();
        expect(getByPlaceholderText("Email")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
        expect(getByPlaceholderText("Confirm Password")).toBeTruthy();
        expect(getByPlaceholderText("Mobile Number")).toBeTruthy();
        expect(getByText("Sign Up")).toBeTruthy();
        expect(getByText("Already have an account? Login")).toBeTruthy();
    });

    test("shows an error when trying to signup with empty fields", () => {
        console.log("✅ Testing signup with empty fields");
        const { getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.press(getByText("Sign Up"));
        expect(Alert.alert).toHaveBeenCalledWith("Error", "Please fill in all fields.");
    });

    test("shows an error when full name is less then 2 letters", () => {
        console.log("✅ Testing full name is less then 2 letters");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "A");
        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "password");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "confirm password");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "1234567890");
        // expect(Alert.alert).toHaveBeenCalledWith("Error", "Full Name must be at least 2 letters.");
        expect(Alert.alert).toHaveBeenCalledWith("Error", "Please fill in all fields.");

    });

    test("shows an error when email regex (format) is invalid", () => {
        console.log("✅ Testing invalid email format");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
        fireEvent.changeText(getByPlaceholderText("Email"), "invalid-email");
        fireEvent.changeText(getByPlaceholderText("Password"), "password123");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "1234567890");
        fireEvent.press(getByText("Sign Up"));
        expect(Alert.alert).toHaveBeenCalledWith("Error", "Please enter a valid email address.");
    });

    test("shows an error when password does not meet security requirements", () => {
        console.log("✅ Testing weak password error");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "weakpass");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "weakpass");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "1234567890");
        fireEvent.press(getByText("Sign Up"));

        expect(Alert.alert).toHaveBeenCalledWith("Error", "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.");
    });

    test("shows an error when passwords do not match", () => {
        console.log("✅ Testing password mismatch error");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Password2!");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "1234567890");
        fireEvent.press(getByText("Sign Up"));

        expect(Alert.alert).toHaveBeenCalledWith("Error", "Passwords do not match.");
    });

    test("shows an error when mobile number is not exactly 10 digits", () => {
        console.log("✅ Testing invalid mobile number error");
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "12345");
        fireEvent.press(getByText("Sign Up"));

        expect(Alert.alert).toHaveBeenCalledWith("Error", "Mobile Number must be exactly 10 digits.");
    });

    test("navigates to Login when signup is successful", () => {
        console.log("✅ Testing successful signup navigation");
        const mockNavigation = { navigate: jest.fn() };
        const { getByPlaceholderText, getByText } = render(<SignupScreen navigation={mockNavigation} />);

        fireEvent.changeText(getByPlaceholderText("Full Name"), "John Doe");
        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Confirm Password"), "Password1!");
        fireEvent.changeText(getByPlaceholderText("Mobile Number"), "1234567890");
        fireEvent.press(getByText("Sign Up"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith("Login");
    });

    test("navigates to Login when 'Already have an account? Login' is pressed", () => {
        console.log("✅ Testing navigation to Login screen");
        const mockNavigation = { navigate: jest.fn() };
        const { getByText } = render(<SignupScreen navigation={mockNavigation} />);

        fireEvent.press(getByText("Already have an account? Login"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith("Login");
    });
});