import GalaxyGraph from "./visualizations/GalaxyGraph/GalaxyGraph";

export default function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#05060a",
        color: "#e8e8f0",
      }}
    >
      <GalaxyGraph />
    </div>
  );
}
