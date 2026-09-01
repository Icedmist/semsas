"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  Download,
  AlertCircle,
  Users,
  Settings,
  PlusCircle,
  CheckCircle2,
  Hourglass,
  UserCheck,
  LogOut,
  ShieldCheck,
  Lock,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { stagger, fadeUpItem, fadeUp } from "@/lib/motion-variants";
import { getBrowserSupabase } from "@/lib/supabase";

/**
 * The Admin Dashboard page component.
 * Provides a mock CMS interface for managing content, roles, and media.
 */
export default function AdminDashboard() {
  const supabase = getBrowserSupabase();
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState("admin@semsas.gombe.gov.ng");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);

  const stats = [
    { label: "Published Articles", count: 18, icon: <FileText className="w-5 h-5 text-emergency-blue" /> },
    { label: "Gallery Assets", count: 42, icon: <ImageIcon className="w-5 h-5 text-primary-navy" /> },
    { label: "Active Downloads", count: 8, icon: <Download className="w-5 h-5 text-success-green" /> },
    { label: "Emergency Alerts", count: 1, icon: <AlertCircle className="w-5 h-5 text-emergency-red" /> },
  ];

  const recentContent = [
    { title: "SEMSAS Expands Rapid Response to Southern regions", type: "News", status: "Published", date: "Aug 1, 2026", author: "Dr. A. Yusuf" },
    { title: "Ambulance Arrival at Gombe Specialist Hospital", type: "Gallery", status: "Published", date: "Aug 1, 2026", author: "Sister Deborah" },
    { title: "SEMSAS Gombe Chapter Annual Review Report", type: "Download", status: "Draft", date: "Jul 29, 2026", author: "Mrs. A. Danjuma" },
    { title: "Advanced Roadway CPR Instruction Video", type: "Video", status: "Draft", date: "Jul 24, 2026", author: "Sister Deborah" },
  ];

  const rolePermissions: Record<string, string[]> = {
    admin: ["manage:users", "manage:content", "manage:dashboard", "manage:assets"],
    manager: ["view:dashboard", "manage:dashboard", "approve:content"],
    claims: ["view:dashboard", "manage:claims", "review:reports"],
    analyst: ["view:dashboard", "manage:reports", "export:data"],
    support: ["view:dashboard", "manage:assets", "manage:users"],
    staff: ["view:dashboard"],
  };

  const roleLabels: Record<string, string> = {
    admin: "Super Administrator",
    manager: "State Coordinator",
    claims: "Claims Manager",
    analyst: "Strategic Information Lead",
    support: "ICT Focal Person",
    staff: "Staff User",
  };

  const selectedRole = profile?.role ? roleLabels[profile.role] || profile.role : "Staff User";

  const fetchProfile = async (userId: string) => {
    if (!supabase) return;

    try {
      const [{ data: profileData, error: profileError }, { data: roleData, error: roleError }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("*").eq("user_id", userId).maybeSingle(),
      ]);

      if (profileError && profileError.code !== "PGRST116") {
        console.warn("Profile error:", profileError.message);
      }

      if (roleError && roleError.code !== "PGRST116") {
        console.warn("Role error:", roleError.message);
      }

      const resolvedRole = roleData?.role || profileData?.role || "staff";
      const resolvedPermissions = roleData?.permissions || profileData?.permissions || rolePermissions[resolvedRole] || rolePermissions.staff;

      setProfile({
        ...profileData,
        role: resolvedRole,
        permissions: resolvedPermissions,
      });
    } catch (caughtError) {
      console.warn("Failed to fetch profile:", caughtError);
      setProfile({ role: "staff", permissions: rolePermissions.staff });
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setError("Supabase environment is not configured for browser auth.");
      console.error("Supabase not initialized - missing environment variables");
      return;
    }

    const restoreSession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          setError(sessionError.message);
        }

        const activeSession = data.session;
        setSession(activeSession);
        if (activeSession?.user) {
          console.log("Existing session found for:", activeSession.user.email);
          await fetchProfile(activeSession.user.id);
        } else {
          console.log("No existing session found");
        }
      } catch (err) {
        console.error("Failed to restore session:", err);
      } finally {
        setLoading(false);
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      console.log("Auth state changed:", _event);
      setSession(nextSession);
      if (nextSession?.user) {
        await fetchProfile(nextSession.user.id);
      } else {
        setProfile(null);
      }
    });

    restoreSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setError("Supabase auth is not configured.");
      console.error("Supabase client not initialized for sign-in");
      return;
    }

    setPending(true);
    setError("");

    try {
      console.log("Attempting sign-in with email:", email);
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("Sign-in error:", signInError);
        setError(signInError.message || "Sign-in failed. Please check your credentials.");
        setPending(false);
        return;
      }

      console.log("Sign-in successful for:", data.user?.email);
      setSession(data.session);
      if (data.session?.user) {
        await fetchProfile(data.session.user.id);
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError("An unexpected error occurred during sign-in.");
    } finally {
      setPending(false);
    }
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  const allowedPermissions = profile?.permissions || rolePermissions.staff;
  const canManageContent = allowedPermissions.includes("manage:content") || allowedPermissions.includes("manage:dashboard");

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center bg-bg-gray">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-primary-navy shadow-sm">
          Loading admin console...
        </div>
      </div>
    );
  }

  if (!session || !profile) {
    return (
      <div className="pt-20 bg-bg-gray min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-navy text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-text">SEMSAS access</p>
              <h1 className="font-heading text-2xl font-black text-primary-navy">Admin Login</h1>
            </div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-muted-text">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-navy focus:bg-white"
                placeholder="admin@semsas.gombe.gov.ng"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-[0.12em] text-muted-text">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-navy focus:bg-white"
                placeholder="Password123!"
                required
              />
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0d2b52] disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Lock className="h-4 w-4" />
              {pending ? "Signing in..." : "Sign in to admin portal"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-muted-text">
            <p className="font-bold text-primary-navy uppercase tracking-[0.12em]">Seeded roles</p>
            <ul className="mt-3 space-y-1.5">
              <li><span className="font-bold text-primary-navy">admin@semsas.gombe.gov.ng</span> — Super Administrator</li>
              <li><span className="font-bold text-primary-navy">claims@semsas.gombe.gov.ng</span> — Claims Manager</li>
              <li><span className="font-bold text-primary-navy">si@semsas.gombe.gov.ng</span> — Strategic Information Lead</li>
              <li><span className="font-bold text-primary-navy">ict@semsas.gombe.gov.ng</span> — ICT Focal Person</li>
              <li><span className="font-bold text-primary-navy">statecoordinator@semsas.gombe.gov.ng</span> — State Coordinator</li>
            </ul>
            <p className="mt-3 font-semibold text-primary-navy">Password for all accounts: Password123!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-bg-gray min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/80 pb-6 text-left">
          <div className="space-y-1">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-primary-navy">SEMSAS Headless CMS</h1>
            <p className="text-xs text-muted-text">Portal Administration Console &bull; Gombe State Emergency Chapter</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary-navy flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-emergency-red" /> Logged in:
            </span>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary-navy">
              {profile.full_name || session.user.email}
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-primary-navy transition hover:border-slate-300"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 h-fit text-left">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="space-y-1.5">
              <div className="text-[10px] uppercase font-bold text-muted-text tracking-widest px-2">Account</div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-text">Role</p>
                <p className="mt-1 font-heading text-lg font-black text-primary-navy">{selectedRole}</p>
                <p className="mt-2 text-xs text-muted-text">{session.user.email}</p>
              </div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="space-y-1.5 pt-4 border-t border-slate-100">
              <div className="text-[10px] uppercase font-bold text-muted-text tracking-widest px-2">Permissions</div>
              <ul className="space-y-1.5 text-xs">
                {allowedPermissions.map((permission: string) => (
                  <li key={permission} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-muted-text">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    {permission}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="lg:col-span-9 space-y-8 text-left">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <motion.div key={idx} variants={fadeUpItem} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-[0_24px_50px_-24px_rgba(10,42,82,0.25)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-muted-text">{stat.label}</span>
                    <AnimatedCounter value={stat.count} className="font-heading font-black text-2xl text-primary-navy tabular-nums" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-primary-navy">Recent Content Activities</h3>
                  <p className="text-[10px] text-muted-text mt-0.5">Items drafted or modified across all media folders.</p>
                </div>

                <button
                  type="button"
                  disabled={!canManageContent}
                  className="btn btn-dark text-xs px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PlusCircle className="w-4 h-4" /> Create New Content
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-primary-navy font-bold border-b border-slate-100 text-left">
                      <th className="px-6 py-4">Title / Asset</th>
                      <th className="px-6 py-4">Media Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Last Updated</th>
                      <th className="px-6 py-4">Author</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-muted-text">
                    {recentContent.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-primary-navy">{item.title}</td>
                        <td className="px-6 py-4">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.status === "Published" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                          }`}>
                            {item.status === "Published" ? <CheckCircle2 className="w-3 h-3" /> : <Hourglass className="w-3 h-3" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{item.date}</td>
                        <td className="px-6 py-4 font-medium">{item.author}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}