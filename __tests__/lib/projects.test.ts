import { describe, it, expect } from "vitest";
import { projects, filters, filterProjects } from "@/lib/projects";

describe("projects data", () => {
  it("every project has all required fields", () => {
    for (const p of projects) {
      expect(p.name, `${p.name}: missing name`).toBeTruthy();
      expect(p.category, `${p.name}: missing category`).toBeTruthy();
      expect(p.tags.length, `${p.name}: no tags`).toBeGreaterThan(0);
      expect(p.description, `${p.name}: missing description`).toBeTruthy();
      expect(p.gradFrom, `${p.name}: missing gradFrom`).toMatch(/^#/);
      expect(p.gradTo, `${p.name}: missing gradTo`).toMatch(/^#/);
      expect(p.accentColor, `${p.name}: missing accentColor`).toMatch(/^#/);
    }
  });

  it("every project category is one of the defined filters", () => {
    const validCategories = filters.filter((f) => f !== "All");
    for (const p of projects) {
      expect(validCategories, `${p.name} has unknown category "${p.category}"`).toContain(
        p.category
      );
    }
  });

  it("Elite Global Workforce project is present with url and image", () => {
    const egw = projects.find((p) => p.name === "Elite Global Workforce");
    expect(egw).toBeDefined();
    expect(egw!.url).toBe("https://www.eliteglobalworkforce.com");
    expect(egw!.image).toBe("/work/elite-global-workforce.png");
    expect(egw!.category).toBe("Website");
  });
});

describe("filterProjects", () => {
  it("returns all projects when category is All", () => {
    expect(filterProjects(projects, "All")).toHaveLength(projects.length);
  });

  it("returns only Website projects", () => {
    const result = filterProjects(projects, "Website");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "Website")).toBe(true);
  });

  it("returns only Web App projects", () => {
    const result = filterProjects(projects, "Web App");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "Web App")).toBe(true);
  });

  it("returns only Mobile App projects", () => {
    const result = filterProjects(projects, "Mobile App");
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === "Mobile App")).toBe(true);
  });

  it("returns empty array for unknown category", () => {
    expect(filterProjects(projects, "Unknown")).toHaveLength(0);
  });
});
