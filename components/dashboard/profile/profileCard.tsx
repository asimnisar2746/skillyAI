import { Camera, Globe, Mail, MapPin, Pencil, User } from "lucide-react";
import { AvatarUploader } from "./avatarUpload";
import { EditPersonalDetailsDialog } from "./editPersonalDetails";

type PersonalDetails = {
  name: string;
  role: string;
  email: string;
  location: string;
  website?: string;
  picture?: string;
};

export function ProfileCard({ values }: { values: PersonalDetails }) {
  return (
    <section className="w-full h-full bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <User className="text-primary size-5 sm:size-6" />
          <h4 className="sm:text-lg font-medium">Personal Details</h4>
        </div>
        <EditPersonalDetailsDialog
          defaultValues={{
            name: values.name,
            role: values.role,
            location: values.location,
            website: values.website ?? "",
          }}
        />
      </div>
      <div className="flex justify-center items-center my-5">
        <div className="flex flex-col items-center space-y-3 text-center">
          <AvatarUploader initialImage={values.picture} />
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold">{values.name}</h3>
            <p className="text-chart-3 font-medium text-sm sm:text-base">
              {values.role}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2 text-foreground/70">
        <div className="flex gap-2 sm:gap-4 items-center">
          <Mail className="sm:size-5 size-4" />
          <span className="text-sm sm:text-base">{values.email}</span>
        </div>

        <div className="flex gap-2 sm:gap-4 items-center">
          <MapPin className="sm:size-5 size-4" />
          <span className="text-sm sm:text-base">
            {values.location || "-- -- --"}
          </span>
        </div>

        <div className="flex gap-2 sm:gap-4 items-center">
          <Globe className="sm:size-5 size-4" />
          <span className="text-sm sm:text-base">
            {values.website || "-- -- --"}
          </span>
        </div>
      </div>
    </section>
  );
}
