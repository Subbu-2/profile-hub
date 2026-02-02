import React from "react";
import "./index.scss";

// Reusable action buttons for list items (used in NEW sections only).
export default function ItemActions({
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  disableUp = false,
  disableDown = false,
  showMove,
  showEdit,
  showDelete,
}) {
  const canMoveUp = typeof onMoveUp === "function";
  const canMoveDown = typeof onMoveDown === "function";
  const canEdit = typeof onEdit === "function";
  const canDelete = typeof onDelete === "function";

  const shouldShowMove =
    typeof showMove === "boolean" ? showMove : canMoveUp || canMoveDown;
  const shouldShowEdit = typeof showEdit === "boolean" ? showEdit : canEdit;
  const shouldShowDelete =
    typeof showDelete === "boolean" ? showDelete : canDelete;

  return (
    <div className="ph-itemActions">
      {shouldShowMove && (
        <>
          <button
            type="button"
            className="ph-itemActions__btn"
            onClick={onMoveUp}
            disabled={!canMoveUp || disableUp}
            title="Move up"
          >
            ↑
          </button>

          <button
            type="button"
            className="ph-itemActions__btn"
            onClick={onMoveDown}
            disabled={!canMoveDown || disableDown}
            title="Move down"
          >
            ↓
          </button>
        </>
      )}

      {shouldShowEdit && (
        <button
          type="button"
          className="ph-itemActions__btn"
          onClick={onEdit}
          disabled={!canEdit}
        >
          Edit
        </button>
      )}

      {shouldShowDelete && (
        <button
          type="button"
          className="ph-itemActions__btn ph-itemActions__btn--danger"
          onClick={onDelete}
          disabled={!canDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}
