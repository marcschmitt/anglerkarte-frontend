export default function ClosedSeason(props) {
  let currentDate = new Date().toJSON().slice(0, 10);
  const from = new Date("2022/04/15");
  const to = new Date("2022/05/31");
  const check = new Date(currentDate);

  return (
    <>
      {props.nav && check > from && check < to && (
        <div className="shadow hidden md:block px-2.5 py-1 rounded-sm ml-4 text-xs bg-red-300 pointer-events-none">
          Frühjahrsschonzeit vom 15. April bis 31. Mai
        </div>
      )}

      {props.map && check > from && check < to && (
        <div className="shadow absolute top-1 w-72 text-center left-1/2 -translate-x-1/2 z-[999] md:hidden py-1 rounded-sm text-xs bg-red-300 pointer-events-none">
          Frühjahrsschonzeit vom 15. April bis 31. Mai
        </div>
      )}
    </>
  );
}
