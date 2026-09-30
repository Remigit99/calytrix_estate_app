import { Building2 } from 'lucide-react';

const EstateLoader = () => {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="flex flex-col items-center text-center">
        {/* Animated house */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Outer pulse */}
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-100 opacity-60" />

          {/* Middle glow */}
          <div className="absolute inset-3 animate-pulse rounded-full bg-indigo-50" />

          {/* House container */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl shadow-indigo-100 ring-1 ring-indigo-100">
            <Building2
              className="h-12 w-12 animate-pulse text-indigo-600"
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Brand */}
        <div className="mt-7">
          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            Calytrix Estate
          </h3>

          <div className="mt-2 flex items-center justify-center gap-1.5">
            <span className="text-sm text-slate-500">
              Finding beautiful places
            </span>

            <span className="flex gap-1">
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"
                style={{ animationDelay: '0ms' }}
              />
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"
                style={{ animationDelay: '150ms' }}
              />
              <span
                className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-500"
                style={{ animationDelay: '300ms' }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstateLoader;