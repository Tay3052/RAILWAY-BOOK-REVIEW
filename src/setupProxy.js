import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware({
      target: "https://railway.bookreview.techtrain.dev",
      changeOrigin: true,
    })
  );
}
