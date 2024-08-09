import { TrashIcon } from "@heroicons/react/24/outline";
import Input from "@/shared/Input";
import Label from "@/shared/Label";
import Select from "@/shared/Select";
import CustomSelect from "./searchableSelect";
import DatePicker from "./DatePicker";

type PassengerFormProps = {
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  dynamicPassengers: {
    guestAdults: number;
    guestChildren: number;
    guestInfants: number;
  };
  removePassenger: (type: "Adult" | "Child" | "Infant", index: number) => void;
};
const options = [
    {
      value: "ET",
      label: "Ethiopia",
      icon: "et", // Using flag-icons class names
    },
    {
      value: "US",
      label: "United States",
      icon: "us", // Using flag-icons class names
    },
  ];

const PassengerForm = ({
  guestAdults,
  guestChildren,
  guestInfants,
  dynamicPassengers,
  removePassenger,
}: PassengerFormProps) => {
  const renderPassengerForms = (
    type: "Adult" | "Child" | "Infant",
    count: number,
    dynamicCount: number
  ) => {
    return Array.from({ length: count }).map((_, index) => (
      <div
        key={`${type}-${index}`}
        className="border p-4 rounded-lg space-y-4 relative"
      >
        <h3 className="font-bold">
          Passenger {index + 1} ({type} Ticket)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Given names</Label>
            <Input placeholder="Given names" />
          </div>
          <div className="space-y-2">
            <Label>Last name (surname)</Label>
            <Input placeholder="Last name" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select className="mt-1.5">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Date of birth</Label>
            {/* <Input type="date" /> */}
            <DatePicker placeholder="Choose a date"  />

          </div>
          <div className="space-y-2">
            <Label>Nationality</Label>
            <CustomSelect
              options={options}
              placeholder="Select country..."
              searchPlaceholder="Search country..."
              hasSearch={true}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>ID type</Label>
            <Input placeholder="ID type" />
          </div>
          <div className="space-y-2">
            <Label>ID number</Label>
            <Input placeholder="ID number" />
          </div>
          <div className="space-y-2">
            <Label>ID expiration date</Label>
            {/* <Input type="date" /> */}
            <DatePicker placeholder="Choose a date"  />
          </div>
        </div>
        {dynamicCount > 0 && (
          <button
            type="button"
            className="absolute top-2 right-2 flex items-center text-red-600 hover:text-red-800"
            onClick={() => removePassenger(type, index)}
          >
            <span>Remove Passenger</span> <TrashIcon className="h-5 w-5 ml-1" />
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {renderPassengerForms(
        "Adult",
        guestAdults,
        dynamicPassengers.guestAdults
      )}
      {renderPassengerForms(
        "Child",
        guestChildren,
        dynamicPassengers.guestChildren
      )}
      {renderPassengerForms(
        "Infant",
        guestInfants,
        dynamicPassengers.guestInfants
      )}
    </div>
  );
};

export default PassengerForm;
