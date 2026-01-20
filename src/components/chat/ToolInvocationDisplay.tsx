"use client";

import { Loader2, FileCode, FilePlus, FileEdit, FileX, FolderInput } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

interface ToolInvocationDisplayProps {
  tool: ToolInvocation;
}

function getFileName(path: string): string {
  return path.split("/").pop() || path;
}

function getToolMessage(tool: ToolInvocation): { message: string; icon: React.ReactNode } {
  const { toolName, args, state } = tool;
  const isComplete = state === "result";
  const path = args.path as string | undefined;
  const fileName = path ? getFileName(path) : "file";
  const command = args.command as string | undefined;

  if (toolName === "str_replace_editor") {
    switch (command) {
      case "create":
        return {
          message: isComplete ? `Created ${fileName}` : `Creating ${fileName}...`,
          icon: <FilePlus className="w-3.5 h-3.5" />,
        };
      case "str_replace":
        return {
          message: isComplete ? `Edited ${fileName}` : `Editing ${fileName}...`,
          icon: <FileEdit className="w-3.5 h-3.5" />,
        };
      case "insert":
        return {
          message: isComplete ? `Updated ${fileName}` : `Updating ${fileName}...`,
          icon: <FileEdit className="w-3.5 h-3.5" />,
        };
      case "view":
        return {
          message: isComplete ? `Viewed ${fileName}` : `Reading ${fileName}...`,
          icon: <FileCode className="w-3.5 h-3.5" />,
        };
      default:
        return {
          message: isComplete ? `Modified ${fileName}` : `Processing ${fileName}...`,
          icon: <FileCode className="w-3.5 h-3.5" />,
        };
    }
  }

  if (toolName === "file_manager") {
    const newPath = args.new_path as string | undefined;
    const newFileName = newPath ? getFileName(newPath) : undefined;

    switch (command) {
      case "delete":
        return {
          message: isComplete ? `Deleted ${fileName}` : `Deleting ${fileName}...`,
          icon: <FileX className="w-3.5 h-3.5" />,
        };
      case "rename":
        return {
          message: isComplete
            ? `Moved ${fileName}${newFileName ? ` to ${newFileName}` : ""}`
            : `Moving ${fileName}...`,
          icon: <FolderInput className="w-3.5 h-3.5" />,
        };
      default:
        return {
          message: isComplete ? `Processed ${fileName}` : `Processing ${fileName}...`,
          icon: <FileCode className="w-3.5 h-3.5" />,
        };
    }
  }

  return {
    message: isComplete ? toolName : `${toolName}...`,
    icon: <FileCode className="w-3.5 h-3.5" />,
  };
}

export function ToolInvocationDisplay({ tool }: ToolInvocationDisplayProps) {
  const isComplete = tool.state === "result" && tool.result;
  const { message, icon } = getToolMessage(tool);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isComplete ? (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-600">{icon}</span>
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}
