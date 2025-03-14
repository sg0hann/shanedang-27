
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/utils/auth";
import { useAnalytics } from "@/utils/analytics";
import { BarChart, UsersRound, Clock, MousePointerClick, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

const Dashboard = () => {
  const { visitorData } = useAnalytics();
  const { recordPageView } = useAnalytics();
  
  useEffect(() => {
    recordPageView("/admin");
    document.title = "Admin Dashboard | Portfolio";
  }, [recordPageView]);
  
  const totalPageViews = Object.values(visitorData.pageViews).reduce((sum, count) => sum + count, 0);
  
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Tổng quan về hoạt động của trang web
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt truy cập</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitorData.totalVisits}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tổng lượt người dùng ghé thăm
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Người dùng</CardTitle>
              <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitorData.uniqueVisitors}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tổng số người dùng duy nhất
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt xem trang</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPageViews}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Tổng lượt xem tất cả trang
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Yêu cầu liên hệ</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{visitorData.contactRequests?.length || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Số lượng tin nhắn đã nhận
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Phân tích lượt xem theo trang</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Bảng</TabsTrigger>
                <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
                <TabsTrigger value="contacts">Tin nhắn</TabsTrigger>
              </TabsList>
              <TabsContent value="table" className="space-y-4">
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-10 px-4 text-left font-medium">Đường dẫn</th>
                        <th className="h-10 px-4 text-right font-medium">Lượt xem</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(visitorData.pageViews).map(([path, count]) => (
                        <tr key={path} className="border-b">
                          <td className="p-4">{path}</td>
                          <td className="p-4 text-right">{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="chart">
                <div className="h-[300px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Biểu đồ dữ liệu sẽ hiển thị ở đây</p>
                </div>
              </TabsContent>
              <TabsContent value="contacts" className="space-y-4">
                {visitorData.contactRequests && visitorData.contactRequests.length > 0 ? (
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="h-10 px-4 text-left font-medium">Tên</th>
                          <th className="h-10 px-4 text-left font-medium">Email</th>
                          <th className="h-10 px-4 text-left font-medium">Tin nhắn</th>
                          <th className="h-10 px-4 text-right font-medium">Ngày</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visitorData.contactRequests.map((request, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-4">{request.name}</td>
                            <td className="p-4">{request.email}</td>
                            <td className="p-4">{request.message}</td>
                            <td className="p-4 text-right">{new Date(request.date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 border rounded-md">
                    <p className="text-muted-foreground">Chưa có tin nhắn nào được gửi</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
