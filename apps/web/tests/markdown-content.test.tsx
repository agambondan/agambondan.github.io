import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarkdownContent } from "../components/markdown-content";

describe("MarkdownContent", () => {
  it("shows copy button for fenced code blocks and copies code", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText }
    });

    render(
      <MarkdownContent
        content={"```go\nfmt.Println(\"hello\")\n```"}
        locale="en"
      />
    );

    const copyButton = screen.getByRole("button", { name: "Copy code block" });
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('fmt.Println("hello")');
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Copy code block" })).toHaveTextContent("Copied");
    });
  });

  it("does not render copy button for inline code", () => {
    render(<MarkdownContent content={"Use `go test` to run checks."} locale="en" />);
    expect(screen.queryByRole("button", { name: "Copy code block" })).not.toBeInTheDocument();
  });
});
