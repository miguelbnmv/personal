window.addEventListener('load', function () {
  var vector = new Two.Vector();
  var entities = [];
  var mouse;
  var colors = ['#f7b267', '#f79d65', '#f4845f', '#f27059', '#f25c54'];
  var words = [
    'Drink',
    'Eat',
    'Cook',
    'Movies',
    'Accessibility',
    'Experience',
    'Netlify',
    'Firebase',
    'MUI',
    'SASS',
    'CSS',
    'HTML',
    'Next.JS',
    'React',
    'Javascript',
    'RedLight',
    'NEI',
    'jeKnowledge',
    'DEI',
    'UC',
    'Coimbra',
    'Porto',
    'Portugal',
    'Front-end',
    'Dreamer',
    'Learner',
    'Developer',
    'Designer?',
    "'Boobs'",
    'Miguel',
    'Hola!',
    'Hey!',
    'Olá!',
  ];

  var two = new Two({
    type: Two.Types.canvas,
    fullscreen: true,
    autostart: true,
  }).appendTo(document.body);

  var solver = Matter.Engine.create();
  solver.world.gravity.y = 1;

  var bounds = {
    length: 5000,
    thickness: 50,
    properties: {
      isStatic: true,
    },
  };

  bounds.left = createBoundary(bounds.thickness, bounds.length);
  bounds.right = createBoundary(bounds.thickness, bounds.length);
  bounds.bottom = createBoundary(bounds.length, bounds.thickness);

  Matter.World.add(solver.world, [
    bounds.left.entity,
    bounds.right.entity,
    bounds.bottom.entity,
  ]);

  var defaultStyles = {
    size: two.width * 0.08,
    weight: 400,
    fill: 'white',
    leading: two.width * 0.08 * 0.8,
    family: 'Passion One, cursive',
    alignment: 'center',
    baseline: 'baseline',
    margin: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  };

  addSlogan();
  resize();
  mouse = addMouseInteraction();
  two.bind('resize', resize).bind('update', update);

  function addMouseInteraction() {
    var mouse = Matter.Mouse.create(document.body);
    var mouseConstraint = Matter.MouseConstraint.create(solver, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
      },
    });

    Matter.World.add(solver.world, mouseConstraint);

    return mouseConstraint;
  }

  function resize() {
    var length = bounds.length;
    var thickness = bounds.thickness;

    vector.x = -thickness / 2;
    vector.y = two.height / 2;
    Matter.Body.setPosition(bounds.left.entity, vector);

    vector.x = two.width + thickness / 2;
    vector.y = two.height / 2;
    Matter.Body.setPosition(bounds.right.entity, vector);

    vector.x = two.width / 2;
    vector.y = two.height + thickness / 2;
    Matter.Body.setPosition(bounds.bottom.entity, vector);

    var size;

    if (two.width < 480) {
      size = two.width * 0.12;
    } else if (two.width > 1080 && two.width < 1600) {
      size = two.width * 0.07;
    } else if (two.width > 1600) {
      size = two.width * 0.06;
    } else {
      size = two.width * 0.08;
    }

    var leading = size * 0.8;

    for (var i = 0; i < two.scene.children.length; i++) {
      var child = two.scene.children[i];

      if (!child.isWord) {
        continue;
      }

      var text = child.text;
      var rectangle = child.rectangle;
      var entity = child.entity;

      text.size = size;
      text.leading = leading;

      var rect = text.getBoundingClientRect(true);
      rectangle.width = rect.width;
      rectangle.height = rect.height;

      Matter.Body.scale(entity, 1 / entity.scale.x, 1 / entity.scale.y);
      Matter.Body.scale(entity, rect.width, rect.height);
      entity.scale.set(rect.width, rect.height);

      text.size = size / 3;
    }
  }

  function addSlogan() {
    var x = defaultStyles.margin.left;
    var y = -two.height;

    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var group = new Two.Group();
      var text = new Two.Text('', 0, 0, defaultStyles);

      group.isWord = true;

      if (word.value) {
        text.value = word.value;

        for (var prop in word.styles) {
          text[prop] = word.styles[prop];
        }
      } else {
        text.value = word;
      }

      var rect = text.getBoundingClientRect();
      var ox = x + rect.width / 2;
      var oy = y + rect.height / 2;

      var ca = x + rect.width;
      var cb = two.width;

      if (ca >= cb) {
        x = defaultStyles.margin.left;
        y +=
          defaultStyles.leading +
          defaultStyles.margin.top +
          defaultStyles.margin.bottom;

        ox = x + rect.width / 2;
        oy = y + rect.height / 2;
      }

      group.translation.x = ox;
      group.translation.y = oy;
      text.translation.y = 14;

      var rectangle = new Two.Rectangle(0, 0, rect.width, rect.height);
      rectangle.fill = colors[Math.floor(Math.random() * 5)];
      rectangle.noStroke();
      rectangle.visible = true;

      var entity = Matter.Bodies.rectangle(ox, oy, 1, 1);
      Matter.Body.scale(entity, rect.width, rect.height);

      entity.scale = new Two.Vector(rect.width, rect.height);
      entity.object = group;
      entities.push(entity);

      x += rect.width + defaultStyles.margin.left + defaultStyles.margin.right;

      group.text = text;
      group.rectangle = rectangle;
      group.entity = entity;

      group.add(rectangle, text);
      two.add(group);
    }

    Matter.World.add(solver.world, entities);
  }

  function update(frameCount, timeDelta) {
    var allBodies = Matter.Composite.allBodies(solver.world);
    Matter.MouseConstraint.update(mouse, allBodies);
    Matter.MouseConstraint._triggerEvents(mouse);

    Matter.Engine.update(solver);

    for (var i = 0; i < entities.length; i++) {
      var entity = entities[i];
      entity.object.position.copy(entity.position);
      entity.object.rotation = entity.angle;
    }
  }

  function createBoundary(width, height) {
    var rectangle = two.makeRectangle(0, 0, width, height);
    rectangle.visible = false;

    rectangle.entity = Matter.Bodies.rectangle(
      0,
      0,
      width,
      height,
      bounds.properties
    );
    rectangle.entity.position = rectangle.position;

    return rectangle;
  }
});
