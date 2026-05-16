import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "@/components/Footer";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/ICLogo", () => ({
  ICLogo: () => <div data-testid="ic-logo" />,
}));
vi.mock("@/components/ui/separator", () => ({
  Separator: () => <hr />,
}));

describe("Footer", () => {
  it("renders the logo", () => {
    render(<Footer />);
    expect(screen.getByTestId("ic-logo")).toBeInTheDocument();
  });

  it("renders service links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /website profiles/i })).toHaveAttribute(
      "href",
      "/services#websites"
    );
    expect(screen.getByRole("link", { name: /web applications/i })).toHaveAttribute(
      "href",
      "/services#webapps"
    );
    expect(screen.getByRole("link", { name: /mobile apps/i })).toHaveAttribute(
      "href",
      "/services#mobile"
    );
  });

  it("renders company links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /our work/i })).toHaveAttribute("href", "/work");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });

  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2026 InfiniteCipher/i)).toBeInTheDocument();
  });

  it("renders the email address", () => {
    render(<Footer />);
    expect(screen.getByText(/hello@infinitecipher\.com/i)).toBeInTheDocument();
  });
});
