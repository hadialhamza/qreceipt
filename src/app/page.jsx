import Logo from "@/components/logo/Logo";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full">
      <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12 text-primary-foreground">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        {/* Logo */}
        <div className="flex items-center gap-2 z-10">
          <Logo/>
          {/* <div className="bg-primary-foreground/10 p-2 rounded-lg backdrop-blur-sm">
            <ShieldCheck size={32} className="text-primary-foreground" />
          </div>
          <span className="font-logo text-primary-foreground text-3xl font-bold tracking-tight">
            Q<span className="text-primary-foreground/80">Receipt</span>
          </span> */}
        </div>

        <div className="z-10 max-w-md">
          <h1 className="font-logo text-5xl font-bold mb-6 leading-tight">
            Digital Trust, <br />
            <span className="text-primary-foreground/80">Simplified.</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
            Generate, manage, and verify digital money receipts with our secure
            AI-powered platform.
          </p>

          <div className="space-y-4">
            {[
              "Instant PDF Generation",
              "AI Powered Smart Entry",
              "Bank-Grade Security",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="text-primary-foreground" size={20} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="z-10 text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} Global Insurance PLC. Internal Tool.
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-background flex flex-col justify-center items-center p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <ShieldCheck size={32} className="text-primary" />
            <span className="font-logo text-3xl font-bold text-foreground">
              Q<span className="text-primary">Receipt</span>
            </span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="mt-2 text-muted-foreground">
              Please sign in to your authorized account.
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="email"
                    required
                    className="pl-10 block w-full rounded-lg border border-input bg-background py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all"
                    placeholder="admin@globalinsurance.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="password"
                    required
                    className="pl-10 block w-full rounded-lg border border-input bg-background py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-input outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-ring border-input rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-foreground"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-all shadow-lg hover:shadow-xl"
            >
              Sign in to Dashboard
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Protected by reCAPTCHA and subject to the Privacy Policy and Terms
            of Service.
          </div>
        </div>
      </div>
    </div>
  );
}
