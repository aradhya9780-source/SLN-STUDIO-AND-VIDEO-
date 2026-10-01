import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import http from "node:http";

const server = new McpServer({
  name: "SLN STUDIO AND VIDEO",
  version: "1.0.0",
});

server.registerTool(
  "studio_information",
  {
    title: "SLN Studio Information",
    description:
      "Provides information about SLN STUDIO AND VIDEO, its photography and videography services, affordable pricing message, and contact number.",
    inputSchema: {
      question: z.string().optional().describe("What information the customer wants about the studio"),
    },
  },
  async () => ({
    content: [
      {
        type: "text",
        text:
          "SLN STUDIO AND VIDEO\n\n" +
          "Best Photography at Affordable Prices.\n" +
          "Quality & Quantity Matter.\n" +
          "We provide all types of Photography and Videography.\n" +
          "Contact: 9008331994",
      },
    ],
  })
);

const port = process.env.PORT || 8787;

const httpServer = http.createServer(async (req, res) => {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("SLN STUDIO AND VIDEO MCP server is running.");
    return;
  }

  if (req.url === "/mcp") {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    res.on("close", () => {
      transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res);
    return;
  }

  res.writeHead(404);
  res.end("Not Found");
});

httpServer.listen(port, () => {
  console.log(`SLN STUDIO AND VIDEO running on port ${port}`);
});
