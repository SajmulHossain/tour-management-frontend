import { CircleAlertIcon } from "lucide-react"
import { useId, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface IProps {
  project_name: string;
  type: string;
  onConfirm: () => void;
}

export default function Delete({project_name, type, onConfirm}: IProps) {
  const id = useId()
  const [inputValue, setInputValue] = useState("")

  const handleDelete = () => {
    onConfirm();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Final confirmation
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              This action cannot be undone. To confirm, please enter the {type}{" "}
              name <span className="text-foreground">{project_name}</span>.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5">
          <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Project name</Label>
            <Input
              id={id}
              type="text"
              placeholder={`Type ${project_name} to confirm`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              className="flex-1"
              disabled={inputValue !== project_name}
              variant={"destructive"}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
