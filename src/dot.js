export default function Dot({position}){
    return (
    //   <div
    //   onPointerMove={e => {
    //     setPosition({x: e.clientX, y: e.clientY});
    //   }}
    //   style={{
    //     position: 'relative',
    //     width: '100vw',
    //     height: '100vh'
    // }}>
        <div style={{
          position: 'absolute',
          transitionDuration: '0.1s',
          backgroundColor: 'black',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          width: 5,
          height: 5,
        }} />
    )
}