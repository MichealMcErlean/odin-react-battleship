export default function FollowerShape({mousePosition, config}) {

  const dynamicShapeStyle = {
    position: 'fixed',
    left: `${mousePosition.x}px`,
    top: `${mousePosition.y}px`,
    transform: `translate(-${config.size / 2}px, -${config.size / 2}px)`,
    width: config.type === 'horizontal' ? `${config.size * config.numberValue}px` : `${config.size}px`,
    height: config.type === 'horizontal' ? `${config.size}px` : `${config.size * config.numberValue}px`,
    pointerEvents: 'none',
    transition: 'all 0.2s ease-out',
    backgroundColor: 'antiquewhite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '18px'
  }

  return (
    <div style={dynamicShapeStyle}>{config.numberValue}</div>
  );
}