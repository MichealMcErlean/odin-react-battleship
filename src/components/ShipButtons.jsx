export default function ShipSelector({availableShips, placedShips, onShipSelect}) {
  return (
    <>
      {Object.keys(availableShips).map((shipType) => {
        const isDisabled = placedShips.includes(shipType);

        return (
          <button
            key={shipType}
            onClick={() => onShipSelect(shipType)}
            disabled = {isDisabled}
          >
            <p>
              {shipType.charAt(0).toUpperCase() + shipType.slice(1)}
            </p>
            <p className='lengthnum'>{availableShips[shipType]}</p>
          </button>
        );
      })}
    </>
  );
}