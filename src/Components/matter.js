// matter.js
import Matter from "matter-js";
import MatterAttractors from "matter-attractors";
import MatterWrap from "matter-wrap";
import $ from "jquery";

Matter.use(MatterAttractors);
Matter.use(MatterWrap);

const dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export function runMatter() {
  const {
    Engine,
    Events,
    Runner,
    Render,
    World,
    Body,
    Mouse,
    Common,
    Bodies,
  } = Matter;

  const engine = Engine.create();
  engine.world.gravity.y = 0;
  engine.world.gravity.x = 0;
  engine.world.gravity.scale = 0.1;

  const render = Render.create({
    element: document.getElementById("myCanvasContainer"),
    engine,
    options: {
      width: dimensions.width,
      height: dimensions.height,
      wireframes: false,
      background: "transparent",
    },
  });

  const runner = Runner.create();
  const world = engine.world;
  world.gravity.scale = 0;

  const attractiveBody = Bodies.circle(
    render.options.width / 2,
    render.options.height / 2,
    Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
    {
      render: { fillStyle: "#000", strokeStyle: "#000", lineWidth: 0 },
      isStatic: true,
      plugin: {
        attractors: [
          (bodyA, bodyB) => ({
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          }),
        ],
      },
    }
  );
  World.add(world, attractiveBody);

  for (let i = 0; i < 60; i++) {
    const x = Common.random(0, render.options.width);
    const y = Common.random(0, render.options.height);
    const s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
    const poly = Common.random(3, 6);

    World.add(
      world,
      Bodies.polygon(x, y, poly, s, {
        mass: s / 20,
        friction: 0,
        frictionAir: 0.02,
        angle: Math.random() * 360,
        render: { fillStyle: "#222", strokeStyle: "#000", lineWidth: 2 },
      })
    );

    const r = Common.random(0, 1);
    World.add(
      world,
      Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: { fillStyle: r > 0.3 ? "#27292d" : "#444", strokeStyle: "#000", lineWidth: 2 },
      })
    );

    World.add(
      world,
      Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: { fillStyle: r > 0.3 ? "#334443" : "#222", strokeStyle: "#111", lineWidth: 4 },
      })
    );

    World.add(
      world,
      Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: { fillStyle: "#191919", strokeStyle: "#111", lineWidth: 3 },
      })
    );
  }

  const mouse = Mouse.create(render.canvas);
  Events.on(engine, "afterUpdate", () => {
    if (!mouse.position.x) return;
    Body.translate(attractiveBody, {
      x: (mouse.position.x - attractiveBody.position.x) * 0.12,
      y: (mouse.position.y - attractiveBody.position.y) * 0.12,
    });
  });

  Runner.run(runner, engine);
  Render.run(render);

  return { engine, runner, render, canvas: render.canvas };
}

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function setWindowSize(m) {
  m.render.canvas.width = $(window).width();
  m.render.canvas.height = $(window).height();
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    Matter.Runner.stop(runner);
  } else {
    Matter.Runner.run(runner, engine);
  }
});