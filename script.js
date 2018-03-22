const screenWidth = () => {
  return window.innerWidth;
};

const screenHeight = () => {
  return window.innerHeight;
};

const random = (min, max) => {
  const distance = max - min;
  return Math.floor(Math.random() * distance) + min;
};

const loop = (times, fn) => {
  new Array(times).fill(0).forEach(fn);
};

const colors = ["#ef798a", "#f7a9a8", "#613f75", "#e5c3d1", "#988b8e"];

const randomColor = () => {
  return colors[random(0, 5)];
};

let draw;

const createSVG = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  draw = SVG(svg);
  draw.node.setAttribute("class", "svg-background");
  document.body.appendChild(draw.node);
};

// Create a star rectancle.
const createStarElement = ({ size, x, y, fill }) => {
  return draw
    .rect(size, size)
    .addClass("star")
    .attr("x", x)
    .attr("y", y)
    .fill(fill);
};

// Create a star and a duplicate star for use in animation.
const createStar = ({ group, size }) => {
  const x = random(0, screenWidth());
  const y = random(0, screenHeight());
  const fill = randomColor();
  group.add(createStarElement({ x, y, size, fill }));
  group.add(createStarElement({ x, y: y - screenHeight(), size, fill }));
};

// Create a group with a povided classname with a bunch of stars.
const createStars = ({ count, size, className }) => {
  const group = draw.group().addClass(className);
  loop(count, () => {
    createStar({ group, size });
  });
};

const inventTheUniverse = () => {
  createSVG();
  createStars({
    count: 100,
    size: 1,
    className: "far-stars-container"
  });

  createStars({
    count: 100,
    size: 2,
    className: "medium-stars-container"
  });

  createStars({
    count: 10,
    size: 3,
    className: "near-stars-container"
  });
}
document.addEventListener("DOMContentLoaded", inventTheUniverse);

window.addEventListener('resize', inventTheUniverse);
