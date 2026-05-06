"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBlogStatus } from "@/features/blogs/api/use-blog-status";

type Props = {
  id: number | string;
  currentStatus?: "pending" | "approved" | "disapproved";
  currentFeedback?: string;
};

const BlogStatusDialog = ({ id, currentStatus, currentFeedback }: Props) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"approved" | "disapproved">(
    currentStatus === "disapproved" ? "disapproved" : "approved",
  );
  const [feedback, setFeedback] = useState(currentFeedback || "");
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateStatus, isPending } = useBlogStatus();

  const handleSave = () => {
    if (!feedback.trim()) {
      setError("Feedback is required");
      return;
    }
    setError(null);
    updateStatus(
      { id, data: { status, admin_feedback: feedback } },
      {
        onSuccess: () => setOpen(false),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" animation="scale_in">
          Approve / Reject
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update blog status</DialogTitle>
          <DialogDescription>
            Approve or reject this blog. Feedback is shown to the author.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-normal">Status</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as "approved" | "disapproved")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="disapproved">Disapproved</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-normal">Admin feedback</Label>
            <Textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Reason / notes for the author..."
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={isPending}>
            {isPending ? (
              <LoaderCircle className="animate-spin" width={20} height={20} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BlogStatusDialog;
