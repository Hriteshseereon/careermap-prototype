import { ReactNode } from 'react';

const MobileFrame = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen bg-muted/40 p-2 sm:p-4">
    <div className="relative w-full max-w-[430px] min-h-[812px] max-h-[932px] bg-background rounded-[2.5rem] shadow-card-lg overflow-hidden border border-border/60 flex flex-col">
      {/* Status bar */}
      <div className="flex items-center justify-between px-7 pt-3 pb-1 text-[11px] font-semibold text-foreground/50">
        <span>9:41</span>
        <div className="flex gap-1.5 items-center">
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-[3px] rounded-full ${i <= 3 ? 'bg-foreground/50' : 'bg-foreground/20'}`} style={{ height: `${6 + i * 2}px` }} />
            ))}
          </div>
          <span className="text-[10px] ml-0.5">5G</span>
          <div className="w-[22px] h-[10px] border border-foreground/40 rounded-[3px] relative ml-0.5">
            <div className="absolute inset-[1.5px] bg-career-green rounded-[1.5px]" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  </div>
);

export default MobileFrame;
