import { Button } from "./ui/button";

export function Btn({ theme = "light", btnLabel, ...props }) {
  const variant = theme === "dark" ? "secondary" : "outline";

  return (
    <Button
      variant={variant}
      {...props}
    >
      {btnLabel}
    </Button>
  );
}