
import { configure, renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as chatService from "./chatService/chatService.js";


configure({
  views: `${Deno.cwd()}/views/`,
});

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addMessage = async (request) => {
  const formData = await request.formData();
  const message = formData.get("message");
  const sender = formData.get("sender");
  await chatService.create(sender, message);
  return redirectTo("/");
};

const showAll = async() => {

  const data = {
    messages: await chatService.showMessages(),
};

  return new Response(await renderFile("index.eta", data), responseDetails);
};


const handleRequest = async(request) => {
   const url = new URL(request.url);
   const path = url.pathname;

  if (request.method === "POST" && path === "/") {
    return await addMessage(request);

  } else {
    return showAll(request);
  }
};


console.log("Server running on http://localhost:7777/");
Deno.serve({ port: 7777}, handleRequest);

