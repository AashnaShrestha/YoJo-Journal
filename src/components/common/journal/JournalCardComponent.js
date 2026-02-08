"use client";

import React from "react";
import { Ellipsis, Pen, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Btn } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export default function JournalCardComponent({
  title,
  createdAt,
  onClick,
  handleDelete,
  handleEdit
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <>
      <div
        className="gap-6 rounded-xl bg-white px-8 py-8 shadow-lg flex justify-between cursor-pointer"
        onClick={onClick}
      >
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p>{createdAt}</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}>
                <Pen className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteDialog(true);
                }}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete journal?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              journal entry.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex gap-2">
            <DialogClose asChild>
              <Btn variant="secondary" btnLabel="Cancel" />
            </DialogClose>
            <Btn
              variant="destructive"
              btnLabel="Delete"
              onClick={() => {
                handleDelete();
                setOpenDeleteDialog(false);
              }}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
