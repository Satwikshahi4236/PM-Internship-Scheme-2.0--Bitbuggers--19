import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be 12 digits'),
  education: z.string().min(1, 'Please select education level'),
  state: z.string().min(1, 'Please select state'),
  // Eligibility fields
  age: z.string().min(1, 'Please select your age range'),
  jobStatus: z.string().min(1, 'Please select your job status'),
  educationStatus: z.string().min(1, 'Please select your education status'),
  familyIncome: z.string().min(1, 'Please select family income range'),
  govtJob: z.string().min(1, 'Please confirm government job status'),
  eligibilityConfirm: z.boolean().refine(val => val === true, {
    message: 'You must confirm eligibility to proceed',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const educationLevels = [
  '10th Pass',
  '12th Pass',
  'Diploma',
  'Graduate',
  'Post Graduate',
];

const states = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya',
  'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
  'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
];

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { t } = useTranslation();
  const { login, register } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      aadhaar: '',
      education: '',
      state: '',
      age: '',
      jobStatus: '',
      educationStatus: '',
      familyIncome: '',
      govtJob: '',
      eligibilityConfirm: false,
    },
  });

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      // Redirect will be handled by auth state change
    } catch (error) {
      console.error('Login error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await register(data);
      // Redirect will be handled by auth state change
    } catch (error) {
      console.error('Registration error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="h-16 w-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-2xl">GoI</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Prime Minister Internship Scheme
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Government of India
          </p>
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="register">{t('signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-center">{t('loginTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                  <div>
                    <Label htmlFor="email">{t('emailPhone')}</Label>
                    <Input
                      id="email"
                      type="email"
                      {...loginForm.register('email')}
                      className="mt-1"
                    />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {loginForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">{t('password')}</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...loginForm.register('password')}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-red-600 mt-1">
                        {loginForm.formState.errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-orange-600 hover:text-orange-500 p-0"
                    >
                      {t('forgotPassword')}
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t('loading') : t('login')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle className="text-center">{t('signupTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                  <div>
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input
                      id="name"
                      {...registerForm.register('name')}
                      className="mt-1"
                    />
                    {registerForm.formState.errors.name && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        {...registerForm.register('email')}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">{t('phone')}</Label>
                      <Input
                        id="phone"
                        {...registerForm.register('phone')}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.phone && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="aadhaar">{t('aadhaar')}</Label>
                    <Input
                      id="aadhaar"
                      {...registerForm.register('aadhaar')}
                      placeholder="1234 5678 9012"
                      className="mt-1"
                    />
                    {registerForm.formState.errors.aadhaar && (
                      <p className="text-sm text-red-600 mt-1">
                        {registerForm.formState.errors.aadhaar.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education">{t('education')}</Label>
                      <Select onValueChange={(value) => registerForm.setValue('education', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {registerForm.formState.errors.education && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.education.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="state">{t('state')}</Label>
                      <Select onValueChange={(value) => registerForm.setValue('state', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="max-h-60">
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {registerForm.formState.errors.state && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.state.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">{t('password')}</Label>
                      <div className="relative mt-1">
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          {...registerForm.register('password')}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                      <div className="relative mt-1">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          {...registerForm.register('confirmPassword')}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-600 mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Eligibility Section */}
                  <div className="border-t pt-6 mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Eligibility Criteria
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                      Please confirm that you meet all eligibility requirements for the Prime Minister Internship Scheme.
                    </p>

                    <div className="space-y-6">
                      {/* Age */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Age Range *
                        </Label>
                        <RadioGroup
                          value={registerForm.watch('age')}
                          onValueChange={(value) => registerForm.setValue('age', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="21-24" id="age-eligible" />
                            <Label htmlFor="age-eligible" className="text-sm">
                              21-24 Years (Eligible)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="age-other" />
                            <Label htmlFor="age-other" className="text-sm text-gray-500">
                              Other (Not Eligible)
                            </Label>
                          </div>
                        </RadioGroup>
                        {registerForm.formState.errors.age && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.age.message}
                          </p>
                        )}
                      </div>

                      {/* Job Status */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Current Job Status *
                        </Label>
                        <RadioGroup
                          value={registerForm.watch('jobStatus')}
                          onValueChange={(value) => registerForm.setValue('jobStatus', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-employed" id="job-not-employed" />
                            <Label htmlFor="job-not-employed" className="text-sm">
                              Not Employed Full Time (Eligible)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="employed" id="job-employed" />
                            <Label htmlFor="job-employed" className="text-sm text-gray-500">
                              Employed Full Time (Not Eligible)
                            </Label>
                          </div>
                        </RadioGroup>
                        {registerForm.formState.errors.jobStatus && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.jobStatus.message}
                          </p>
                        )}
                      </div>

                      {/* Education Status */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Current Education Status *
                        </Label>
                        <RadioGroup
                          value={registerForm.watch('educationStatus')}
                          onValueChange={(value) => registerForm.setValue('educationStatus', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="not-enrolled" id="edu-not-enrolled" />
                            <Label htmlFor="edu-not-enrolled" className="text-sm">
                              Not Enrolled Full Time (Eligible)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="enrolled" id="edu-enrolled" />
                            <Label htmlFor="edu-enrolled" className="text-sm text-gray-500">
                              Enrolled Full Time (Not Eligible)
                            </Label>
                          </div>
                        </RadioGroup>
                        {registerForm.formState.errors.educationStatus && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.educationStatus.message}
                          </p>
                        )}
                      </div>

                      {/* Family Income */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Family Income (Self/Spouse/Parents) *
                        </Label>
                        <RadioGroup
                          value={registerForm.watch('familyIncome')}
                          onValueChange={(value) => registerForm.setValue('familyIncome', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="below-8-lakhs" id="income-eligible" />
                            <Label htmlFor="income-eligible" className="text-sm">
                              No one earning more than ₹8 Lakhs PA (Eligible)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="above-8-lakhs" id="income-not-eligible" />
                            <Label htmlFor="income-not-eligible" className="text-sm text-gray-500">
                              Someone earning more than ₹8 Lakhs PA (Not Eligible)
                            </Label>
                          </div>
                        </RadioGroup>
                        {registerForm.formState.errors.familyIncome && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.familyIncome.message}
                          </p>
                        )}
                      </div>

                      {/* Government Job */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Government Job in Family *
                        </Label>
                        <RadioGroup
                          value={registerForm.watch('govtJob')}
                          onValueChange={(value) => registerForm.setValue('govtJob', value)}
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no-govt-job" id="govt-job-no" />
                            <Label htmlFor="govt-job-no" className="text-sm">
                              No family member has Government Job (Eligible)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="has-govt-job" id="govt-job-yes" />
                            <Label htmlFor="govt-job-yes" className="text-sm text-gray-500">
                              Family member has Government Job (Not Eligible)
                            </Label>
                          </div>
                        </RadioGroup>
                        {registerForm.formState.errors.govtJob && (
                          <p className="text-sm text-red-600 mt-1">
                            {registerForm.formState.errors.govtJob.message}
                          </p>
                        )}
                      </div>

                      {/* Eligibility Confirmation */}
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="eligibility-confirm"
                            checked={registerForm.watch('eligibilityConfirm')}
                            onCheckedChange={(checked) => 
                              registerForm.setValue('eligibilityConfirm', checked as boolean)
                            }
                            className="mt-1"
                          />
                          <div>
                            <Label htmlFor="eligibility-confirm" className="text-sm font-medium text-gray-900">
                              I confirm that I meet all eligibility criteria
                            </Label>
                            <p className="text-xs text-gray-600 mt-1">
                              By checking this box, I declare that all information provided is true and accurate.
                              I understand that providing false information may result in disqualification.
                            </p>
                          </div>
                        </div>
                        {registerForm.formState.errors.eligibilityConfirm && (
                          <p className="text-sm text-red-600 mt-2">
                            {registerForm.formState.errors.eligibilityConfirm.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    disabled={isLoading}
                  >
                    {isLoading ? t('loading') : t('signup')}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}