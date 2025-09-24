// Move this file to the project root (outside src) and update the path below if needed
declare module "../firebase" {
	import { Auth, GoogleAuthProvider } from "firebase/auth";
	export const auth: Auth;
	export const googleProvider: GoogleAuthProvider;
}