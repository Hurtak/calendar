import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    inert?: "true" | null;
  }
}
