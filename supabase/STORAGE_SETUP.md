# Supabase Storage Setup

## إنشاء bucket للصور المركبات

لجعل رفع صور المركبات يعمل بشكل صحيح، يجب إنشاء bucket في Supabase Storage:

### الخطوات:

1. افتح Supabase Dashboard
2. اذهب إلى **Storage** في القائمة الجانبية
3. اضغط على **"New bucket"** أو **"إنشاء bucket جديد"**
4. أدخل المعلومات التالية:
   - **Name**: `vehicles`
   - **Public bucket**: ✅ **فعل هذا** (مهم جداً)
   - **File size limit**: `5MB` (أو حسب ما تريد)
   - **Allowed MIME types**: `image/*`

5. بعد الإنشاء، اضغط على **Policies** لإعداد الصلاحيات:

### Row Level Security Policies للـ vehicles bucket:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload vehicles"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'vehicles');

-- Allow public read access (so images can be displayed)
CREATE POLICY "Public can view vehicle images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'vehicles');

-- Allow users to update their own uploaded files
CREATE POLICY "Users can update their own vehicle images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'vehicles' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own uploaded files
CREATE POLICY "Users can delete their own vehicle images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'vehicles' AND auth.uid()::text = (storage.foldername(name))[1]);
```

أو يمكنك استخدام الصلاحيات المبسطة:

```sql
-- Allow anyone to upload (for development)
CREATE POLICY "Anyone can upload to vehicles"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'vehicles');

-- Allow public read access
CREATE POLICY "Public can read vehicles"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicles');
```

## التحقق من أن كل شيء يعمل:

1. بعد إنشاء bucket وضبط الصلاحيات
2. جرب رفع صورة من صفحة تسجيل السائق
3. افتح Developer Console (F12) وراقب الرسائل:
   - `Starting photo upload...`
   - `Upload successful: {...}`
   - `Public URL: https://...`
   - `Vehicle photo URL in driverData: https://...`
   - `Driver data saved successfully: {...}`

إذا رأيت أي أخطاء في Console، ستساعدك على تحديد المشكلة.

