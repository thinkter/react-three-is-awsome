# React Three Physics Playground

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React Three Fiber](https://img.shields.io/badge/3D-React_Three_Fiber-049EF4?logo=threedotjs&logoColor=white)
![Rapier](https://img.shields.io/badge/physics-Rapier-ef4444)

A small browser-based 3D playground for experimenting with React Three Fiber controls and rigid-body physics.

</div>

```mermaid
flowchart LR
  INPUT["Keyboard input"] --> PLAYER["Controllable box"]
  PLAYER --> PHYSICS["Rapier physics world"]
  BOXES["Dynamic boxes and spheres"] --> PHYSICS
  GROUND["Fixed ground collider"] --> PHYSICS
  PHYSICS --> SCENE["React Three Fiber scene"]
  SCENE --> CANVAS["Browser WebGL canvas"]
```

## Features

- Keyboard-controlled 3D box.
- Dynamic cube and sphere rigid bodies.
- Ground collider, gravity, lighting, and camera controls.
- Next.js client-side scene composition.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

The main experiment lives in `app/components/Scene.tsx`; `app/page.tsx` mounts it into the Next.js application.
