import React from "react";

const TodoCount: React.FC<{ count: number; label?: string }> = ({
  count,
  label = "Todos",
}) => {
  return (
    <p>
      {count} {label}
    </p>
  );
};

export default TodoCount;
