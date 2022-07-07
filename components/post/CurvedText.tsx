export default function CurvedText() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="100 150 260 200"
        width={750}
        height={800}
      >
        <title>Welcoming</title>
        <defs>
          <path
            d="M243.2, 382.4c-74.8,   
    0-135.5-60.7-135.5-135.5s60.7-135.5,135.5-135.5s135.5, 60.7, 135.5,
    135.5 S318, 382.4, 243.2, 382.4z"
            id="textcircle"
          >
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur="30s"
              type="rotate"
              from="0 250 250"
              to="360 250 250"
              repeatCount="indefinite"
            />
          </path>
        </defs>
        <text dy="70" textLength="800">
          <textPath xlinkHref="#textcircle">Welcome Stranger!</textPath>
        </text>
        <text dy="100" textLength="820" className="second-text">
          <textPath xlinkHref="#textcircle">What brings you here?</textPath>
        </text>
      </svg>
      <style jsx>{`
        div {
          overflow: hidden;
          height: 500px;
        }
        svg {
          position: absolute;
          top: 0%;
          right: 0;
          padding: 0;
        }
        text {
          font-family: "Snug", serif;
          fill: var(--blue-main);
          font-weight: 800;
          font-size: 2.3rem;
        }
        .second-text {
          font-weight: 600;
          font-size: 0.9rem;
          fill: var(--blue-sub);
        }
      `}</style>
    </>
  );
}
