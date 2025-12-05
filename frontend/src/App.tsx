import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">
            ✅ shadcn/ui + Light Blue Theme
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Button test */}
          <div className="space-y-2">
            <Button className="w-full">Primary Button</Button>
            <Button variant="secondary" className="w-full">
              Secondary Button
            </Button>
            <Button variant="outline" className="w-full">
              Outline Button
            </Button>
          </div>

          {/* Input test */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="test@example.com" />
          </div>

          {/* Status */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-center">
              Light blue theme activated! 🎨
            </p>
            <p className="text-sm text-green-600 text-center mt-1">
              Primary color should be blue
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App