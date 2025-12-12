import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useAuth } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import { useDeviceStore } from "./store/device.store";
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
  const deviceStore = useDeviceStore((state) => state);

  useEffect(() => {
    const getDeviceFingerprint = async () => {
      const deviceId = await getFingerprint();
      deviceStore.setDeviceId(deviceId);
      
      // Only set the device language if the user hasn't manually selected one
      if (!deviceStore.hasManuallySelectedLanguage) {
        deviceStore.setDeviceLanguage(navigator.language);
      }
    };
    
    getDeviceFingerprint();
  }, []);

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
