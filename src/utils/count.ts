export function getItemCount(...args: (any[] | boolean)[]): number {
  let count = 0;

  args.forEach((arg) => {
    if (typeof arg === "boolean") {
      // don't count
      return;
    }

    count = count + arg.length;
  });

  return count;
}
