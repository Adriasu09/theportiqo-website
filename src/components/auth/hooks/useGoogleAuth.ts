import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { useFingerprintStore } from "@/src/store/fingerprint.store";
import { SignInWithGoogleData } from "../schemas/login.schema";

export const useGoogleAuth = () => {
  const { signInWithGoogle } = useAuth();
  const deviceId = useFingerprintStore((state) => state.deviceId);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log("Google login Success:", credentialResponse);
      const signInWithGoogleData: SignInWithGoogleData = {
        token: credentialResponse.access_token,
        device_type: "web",
        device_fingerprint: deviceId,
      };
      const res = await signInWithGoogle(signInWithGoogleData);

      if ("requires_otp" in res && res.requires_otp) {
        navigate({
          to: "/auth/enter-code",
          search: { email: res.email || "-" },
        });
        return;
      }
    },
    onError: (error) => console.error("Google login Failed:", error),
  });

  return { loginGoogle };
};
