module.exports = {
  apps: [
    {
      name: "taphoaweb-vn",
      script: "server.js",
      cwd: "/var/www/taphoaweb-vn/current",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "350M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "0.0.0.0"
      }
    }
  ]
};
