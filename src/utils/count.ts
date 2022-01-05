export function getItemCount(...args: (JSX.Element[] | boolean)[]): number {
  let count = 0;

  args.forEach((arg) => {
    if (typeof arg === "boolean") {
      // don't count
    } else {
      count = count + arg.length;
    }
  });

  return count;
}
