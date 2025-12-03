import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function AboutUs() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">من نحن</h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-right">رسالتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-right text-lg leading-relaxed">
                نقدم في تطبيق توصيل بيوكرة تجربة توصيل سلسة وسريعة وموثوقة لجميع سكان وزوار مدينة بيوكرة. نؤمن بأن كل طلب هو وعد نلتزم به، ونسعى جاهدين لتوفير خدمة متميزة تلبي توقعات عملائنا الكرام.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-right">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-right text-gray-700">
                  أن نكون الخيار الأول في مجال التوصيل بمدينة بيوكرة، من خلال تقديم حلول مبتكرة تلبي احتياجات عملائنا وتسهم في تطوير قطاع التوصيل المحلي.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-right">قيمنا</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-right">
                  <li>• الجودة في الأداء</li>
                  <li>• الالتزام بالمواعيد</li>
                  <li>• الشفافية والمصداقية</li>
                  <li>• الابتكار والتطوير المستمر</li>
                  <li>• رضا العملاء أولوية</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-right">فريقنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-right mb-4">
                نفتخر بفريقنا المتميز من السائقين المحترفين وموظفي الدعم الذين يعملون بجد لتقديم أفضل خدمة ممكنة. كل فرد في فريقنا مدرب بشكل جيد لضمان تجربة توصيل استثنائية.
              </p>
              <p className="text-right">
                نسعى دائمًا للتواصل مع عملائنا الكرام وسماع ملاحظاتهم لتحسين خدماتنا باستمرار.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-right">تواصل معنا</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-right">
                  <span className="font-semibold">البريد الإلكتروني:</span> info@tawsil-biokra.com
                </p>
                <p className="text-right">
                  <span className="font-semibold">هاتف:</span> +212 6XX-XXXXXX
                </p>
                <p className="text-right">
                  <span className="font-semibold">العنوان:</span> مدينة بيوكرة، المغرب
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
