"use client";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { updateOrderStatus } from "./actions"
const statuses = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Shipped",
    value: "shipped",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
];

export default function StatusSelector({ status, id }: { status: string, id: number }) {
  return (
    <Select defaultValue={status} onValueChange={(value) => updateOrderStatus(id, value)}>
      <SelectTrigger>
        <SelectInput placeholder="Select option" className="flex-1" />
        <SelectIcon className="mr-3" />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          {statuses.map((status) => (
            <SelectItem
              key={status.value}
              label={status.label}
              value={status.value}
            />
          ))}
          <SelectItem label="Blue" value="blue" />
          <SelectItem label="Black" value="black" />
          <SelectItem label="Pink" value="pink" isDisabled={true} />
          <SelectItem label="Green" value="green" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
