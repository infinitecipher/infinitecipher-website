import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/Navbar";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/ICLogo", () => ({
  ICLogo: () => <div data-testid="ic-logo" />,
}));
vi.mock("@/components/ThemeToggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.PropsWithChildren) => (
    <button {...props}>{children}</button>
  ),
}));
vi.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SheetContent: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
  SheetTrigger: ({ render: r }: { render: React.ReactNode }) => <>{r}</>,
}));
vi.mock("@/components/ui/navigation-menu", () => ({
  NavigationMenu: ({ children }: React.PropsWithChildren) => <nav>{children}</nav>,
  NavigationMenuList: ({ children }: React.PropsWithChildren) => <ul>{children}</ul>,
  NavigationMenuItem: ({ children }: React.PropsWithChildren) => <li>{children}</li>,
  NavigationMenuLink: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
  navigationMenuTriggerStyle: () => "",
}));
vi.mock("@/lib/utils", () => ({ cn: (...a: string[]) => a.filter(Boolean).join(" ") }));

describe("Navbar", () => {
  it("renders the logo", () => {
    render(<Navbar />);
    // Navbar mounts ICLogo twice — once for desktop, once inside the mobile sheet
    expect(screen.getAllByTestId("ic-logo").length).toBeGreaterThanOrEqual(1);
  });

  it("renders all navigation links", () => {
    render(<Navbar />);
    expect(screen.getAllByRole("link", { name: /services/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /work/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /about/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /contact/i }).length).toBeGreaterThan(0);
  });

  it("Get Started link points to /contact", () => {
    render(<Navbar />);
    const ctaLinks = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === "/contact");
    expect(ctaLinks.length).toBeGreaterThan(0);
  });

  it("Services link points to /services", () => {
    render(<Navbar />);
    const links = screen
      .getAllByRole("link")
      .filter((el) => el.getAttribute("href") === "/services");
    expect(links.length).toBeGreaterThan(0);
  });
});
