import {
  User,
  Mail,
  CalendarDays,
} from "lucide-react";

interface Props {
  user: any;
}

export default function UserCard({
  user,
}: Props) {
  const items = [
    {
      icon: User,
      label: "Name",
      value: user.name,
    },
    {
      icon: Mail,
      label: "Email",
      value: user.email,
    },
    {
      icon: CalendarDays,
      label: "Joined",
      value: new Date(
        user.createdAt
      ).toLocaleDateString(),
    },
  ];

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">
          User Information
        </h2>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-xl border p-4"
            >
              <div className="rounded-lg bg-primary/10 p-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  {item.label}
                </p>

                <p className="truncate font-medium">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}