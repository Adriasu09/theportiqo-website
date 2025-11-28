import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import { useFingerprintStore } from "./store/fingerprint.store";
import { useEffect } from "react";
import { getFingerprint } from "./components/shared/utils/fingerprint.utils";

const router = createRouter({ routeTree, context: { auth: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();
  const setDeviceId = useFingerprintStore((state) => state.setDeviceId);

  useEffect(() => {
    const getDeviceFingerprint = async () => {
      const deviceId = await getFingerprint();
      setDeviceId(deviceId);
    };
    
    getDeviceFingerprint();
  }, []);

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
