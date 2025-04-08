import { fireEvent, render } from "@testing-library/react-native";
import LoginScreen from "../components/Login";
import { Alert } from "react-native";

describe("LoginScreen Components", () => {

    beforeEach(() => {
        jest.spyOn(Alert, "alert"); // Mock Alert.alert()
    });

    test("render all UI elements correctly", () => {
        console.log("✅ Checking UI elements render correctly");
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);

        expect(getByPlaceholderText("Email")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
        expect(getByText("Login")).toBeTruthy();
        expect(getByText("Don't have an account? Sign Up")).toBeTruthy();
    });

    test("shows an error when trying to login with empty fields", () => {
        console.log("✅ Testing login with empty fields");
        const { getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);

        fireEvent.press(getByText("Login"));
        expect(Alert.alert).toHaveBeenCalledWith("Error", "Please enter both email and password.");
    });

    test("shows an error when email regex (format) is invalid", () => {
        console.log("✅ Testing invalid email format");
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{navigate: jest.fn() }}/>);

        fireEvent.changeText(getByPlaceholderText("Email"), "invalid-email");
        fireEvent.changeText(getByPlaceholderText("Password"), "password123");
        fireEvent.press(getByText("Login"));
        expect(Alert.alert).toHaveBeenCalledWith("Error", "Please enter a valid email address.");
    });

    test("shows an error when password does not meet security requirement", () => {
        console.log("✅ Testing weak password error");
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }}/>);

        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "weakpass");
        fireEvent.press(getByText("Login"));

        expect(Alert.alert).toHaveBeenCalledWith("Error", "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.");
    });

    test("navigates to Dashboard when login is successful", () => {
        console.log("✅ Testing successful login navigation");
        const mockNavigation = { navigate: jest.fn() };
        const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={mockNavigation}/>);

        fireEvent.changeText(getByPlaceholderText("Email"), "test@example.com");
        fireEvent.changeText(getByPlaceholderText("Password"), "StrongPass1!");
        fireEvent.press(getByText("Login"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith("Dashboard");
    });

    test("navigates to Signup when 'Sign Up' is pressed", () => {
        console.log("✅ Testing navigation to Signup screen");
        const mockNavigation = { navigate: jest.fn() };
        const { getByText } = render(<LoginScreen navigation={mockNavigation}/>);

        fireEvent.press(getByText("Don't have an account? Sign Up"));

        expect(mockNavigation.navigate).toHaveBeenCalledWith("Signup");
    });

});
