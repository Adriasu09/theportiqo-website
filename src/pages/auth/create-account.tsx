import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const CreateAccountPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center gap-8">
        <Badge variant="pop">1/3</Badge>
        <h1 className="font-accent text-qo-h3">Create Account</h1>
      </div>

      <form className="flex w-full flex-col items-center justify-center gap-4">
        <Input type="text" />
      </form>
    </div>
  );
};
