
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.fill_all_fields'),
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.passwords_dont_match'),
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: t('auth.password_length'),
      });
      return;
    }

    try {
      setIsLoading(true);
      await signUp(email, password, firstName, lastName);
      // Auth state change will handle redirection
    } catch (error) {
      // Error is already handled in the auth context
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{t('auth.create_account')}</h1>
        <p className="text-sm text-muted-foreground">
          {t('auth.enter_information')}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">{t('auth.first_name')}</Label>
            <Input
              id="firstName"
              placeholder={t('auth.first_name_placeholder')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">{t('auth.last_name')}</Label>
            <Input
              id="lastName"
              placeholder={t('auth.last_name_placeholder')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('auth.email')}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t('auth.email_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{t('auth.password')}</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">{t('auth.confirm_password')}</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t('auth.creating_account') : t('auth.create_account_button')}
        </Button>
      </form>
    </div>
  );
}
