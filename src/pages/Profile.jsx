import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  // First letter of the name for the avatar circle
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-silver/60 bg-white shadow-lg shadow-forest/5">
        {/* Header band */}
        <div className="h-24 bg-forest" />

        <div className="px-6 pb-8 sm:px-8">
          {/* Avatar */}
          <div className="-mt-12 flex flex-col items-center text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-wine text-4xl font-bold text-white shadow-md">
              {initial}
            </span>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-ink">
              {user?.name}
            </h1>
            <p className="text-sm text-ink/60">User Profile</p>
          </div>

          <hr className="my-6 border-silver/60" />

          {/* Details */}
          <dl className="flex flex-col gap-4">
            <div className="rounded-xl bg-mist/70 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Name
              </dt>
              <dd className="mt-1 text-lg font-semibold text-ink">
                {user?.name}
              </dd>
            </div>

            <div className="rounded-xl bg-mist/70 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Email
              </dt>
              <dd className="mt-1 break-all text-lg font-semibold text-ink">
                {user?.email}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Profile;