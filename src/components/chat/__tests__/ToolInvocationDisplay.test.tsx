import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolInvocationDisplay } from "../ToolInvocationDisplay";

afterEach(() => {
  cleanup();
});

test("displays 'Creating' message for str_replace_editor create command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.tsx" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Creating App.tsx...")).toBeDefined();
});

test("displays 'Created' message for str_replace_editor create command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/components/Button.tsx" },
        state: "result",
        result: "success",
      }}
    />
  );

  expect(screen.getByText("Created Button.tsx")).toBeDefined();
});

test("displays 'Editing' message for str_replace_editor str_replace command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/App.tsx" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Editing App.tsx...")).toBeDefined();
});

test("displays 'Edited' message for str_replace_editor str_replace command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "str_replace", path: "/App.tsx" },
        state: "result",
        result: "success",
      }}
    />
  );

  expect(screen.getByText("Edited App.tsx")).toBeDefined();
});

test("displays 'Updating' message for str_replace_editor insert command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "insert", path: "/utils.ts" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Updating utils.ts...")).toBeDefined();
});

test("displays 'Updated' message for str_replace_editor insert command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "insert", path: "/utils.ts" },
        state: "result",
        result: "success",
      }}
    />
  );

  expect(screen.getByText("Updated utils.ts")).toBeDefined();
});

test("displays 'Reading' message for str_replace_editor view command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "view", path: "/config.json" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Reading config.json...")).toBeDefined();
});

test("displays 'Viewed' message for str_replace_editor view command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "view", path: "/config.json" },
        state: "result",
        result: "file contents",
      }}
    />
  );

  expect(screen.getByText("Viewed config.json")).toBeDefined();
});

test("displays 'Deleting' message for file_manager delete command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "file_manager",
        args: { command: "delete", path: "/old-file.ts" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Deleting old-file.ts...")).toBeDefined();
});

test("displays 'Deleted' message for file_manager delete command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "file_manager",
        args: { command: "delete", path: "/old-file.ts" },
        state: "result",
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Deleted old-file.ts")).toBeDefined();
});

test("displays 'Moving' message for file_manager rename command in progress", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "file_manager",
        args: { command: "rename", path: "/old.ts", new_path: "/new.ts" },
        state: "pending",
      }}
    />
  );

  expect(screen.getByText("Moving old.ts...")).toBeDefined();
});

test("displays 'Moved' message with new filename for file_manager rename command completed", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "file_manager",
        args: { command: "rename", path: "/old.ts", new_path: "/renamed.ts" },
        state: "result",
        result: { success: true },
      }}
    />
  );

  expect(screen.getByText("Moved old.ts to renamed.ts")).toBeDefined();
});

test("shows green indicator when tool is complete", () => {
  const { container } = render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.tsx" },
        state: "result",
        result: "success",
      }}
    />
  );

  const indicator = container.querySelector(".bg-emerald-500");
  expect(indicator).toBeDefined();
});

test("shows spinner when tool is in progress", () => {
  const { container } = render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.tsx" },
        state: "pending",
      }}
    />
  );

  const spinner = container.querySelector(".animate-spin");
  expect(spinner).toBeDefined();
});

test("handles unknown tool names gracefully", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "unknown_tool",
        args: { path: "/file.ts" },
        state: "result",
        result: "done",
      }}
    />
  );

  expect(screen.getByText("unknown_tool")).toBeDefined();
});

test("extracts filename from nested path", () => {
  render(
    <ToolInvocationDisplay
      tool={{
        toolName: "str_replace_editor",
        args: { command: "create", path: "/src/components/ui/Button.tsx" },
        state: "result",
        result: "success",
      }}
    />
  );

  expect(screen.getByText("Created Button.tsx")).toBeDefined();
});
